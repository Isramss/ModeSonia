import Article from "../models/ArticleModel";
import Cart from "../models/CartModel";
import User from "../models/UserModel";

const getCartItems = async (req, res) => {
  try {
    // Recherche de l'utilisateur
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Recherche du panier de l'utilisateur
    const cart = await Cart.findById(user.cart);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Récupération des détails des articles dans le panier
    const cartItems = await Promise.all(
      cart.articles.map(async (cartItem) => {
        const article = await Article.findById(cartItem.article);
        return {
          _id: article._id,
          title_Produit: article.title_Produit,
          imageURL: article.imageURL,
          price: article.price,
          quantity: cartItem.quantity,
        };
      })
    );

    res.status(200).json({ cartItems });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart items", error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    // Recherche de l'utilisateur
    const user = await User.findById(req.params.userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let cart = await Cart.findById(user.cart);

    if (!cart) {
      // Création d'un nouvel élément de panier
      cart = await Cart.create({ articles: [] });

      // Ajout de l'élément de panier à l'utilisateur
      user.cart.push(cart._id);
      user.save();
    }
    // Recherche de l'article
    const article = await Article.findById(req.params.articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const requestedQuantity = parseInt(req.body.quantity);
    if (requestedQuantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }
    if (requestedQuantity > article.quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    // Vérification si le produit est déjà dans le panier
    const existingItemIndex = cart.articles.findIndex(
      (item) => item.article.toString() === req.params.articleId
    );

    if (existingItemIndex !== -1) {
      // Si le produit est déjà dans le panier, mettre à jour la quantité
      cart.articles[existingItemIndex].quantity += requestedQuantity;
    } else {
      // Si le produit n'est pas dans le panier, ajoutez-le
      cart.articles.push({
        article: article._id,
        quantity: requestedQuantity,
      });
    }
    await cart.save();

    res
      .status(200)
      .json({ message: "Article added to cart successfully", cart });
    console.log(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error to add article to cart", error: error.message });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const { userId, articleId } = req.params;

    // Recherche de l'utilisateur
    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Recherche du panier de l'utilisateur
    const cart = await Cart.findById(user.cart[0]);
    if (!cart) {
      return { success: false, message: "Cart not found" };
    }

    // Retirer l'article du panier
    const updatedCartItems = cart.articles.filter(
      (item) => item.article.toString() !== articleId
    );
    cart.articles = updatedCartItems;
    await cart.save();
    res
      .status(200)
      .json({ message: "article removed from cart successfully", cart });
  } catch (error) {
    return {
      success: false,
      message: "Error removing item from cart",
      error: error.message,
    };
  }
};

export { addToCart, getCartItems, removeItemFromCart };
