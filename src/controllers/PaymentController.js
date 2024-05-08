import Cart from "../models/CartModel";
import User from "../models/UserModel";
import Article from "../models/ArticleModel";
import Stripe from "stripe";
import "dotenv/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handlePayment = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = await Cart.findById(user.cart).populate("articles");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const articles = req.body.lineItems;
    const lineItems = await Promise.all(
      articles.map(async (item) => {
        const article = await Article.findById(item.articleId);
        if (!article) {
          throw new Error("Article not found");
        }
        const unitAmount = Math.round(article.price * 100);
        const image = article.imageURL;

        const quantity = item.quantity || 1;
        // article.quantity -= quantity; // Déduire la quantité vendue du stock actuel
        // article.quantity.save();

        return {
          price_data: {
            currency: "eur",
            product_data: {
              images: [image],
              name: article.title_Produit,
              description: article.description,
            },
            unit_amount: unitAmount,
          },
          quantity: quantity,
        };
      })
    );

    console.log(lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: user.email,
      success_url: `http://localhost:5173/`,
      cancel_url: `http://localhost:5173/`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Something went wrong", err });
  }
};

// const handlePayment = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const cart = await Cart.findById(user.cart).populate("articles");
//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     const articles = req.body.lineItems;
//     const lineItems = await Promise.all(
//       articles.map(async (item) => {
//         const article = await Article.findById(item.articleId);
//         if (!article) {
//           throw new Error("Article not found");
//         }
//         const unitAmount = Math.round(article.price * 100);
//         const image = article.imageURL;

//         const quantity = item.quantity || 1;

//         // Vérifier si l'article est défini avant de sauvegarder
//         if (article.quantity) {
//           article.quantity -= quantity; // Déduire la quantité vendue du stock actuel
//           await article.save(); // Sauvegarder l'article
//         }

//         return {
//           price_data: {
//             currency: "eur",
//             product_data: {
//               images: [image],
//               name: article.title_Produit,
//               description: article.description,
//             },
//             unit_amount: unitAmount,
//           },
//           quantity: quantity,
//         };
//       })
//     );

//     console.log(lineItems);

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       customer_email: user.email,
//       success_url: `http://localhost:5173/`,
//       cancel_url: `http://localhost:5173/`,
//     });

//     res.json({ url: session.url });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: "Something went wrong", err });
//   }
// };

export { handlePayment };
