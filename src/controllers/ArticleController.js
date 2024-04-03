import Article from "../models/ArticleModel";

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getArticle = async (req, res) => {
  try {
    const articles = await Article.findById({ _id: req.params.id });
    res.json(articles);
  } catch (error) {
    res.status(500).json(error);
  }
};

const creatArticle = async (req, res) => {
  const { title_Produit, imageURL, price, description } = req.body;
  try {
    const articles = new Article({
      title_Produit,
      imageURL,
      price,
      description,
    });
    await articles.save();
    res.json({ message: "Article created", articles });
  } catch (error) {
    res.status(400).json({ message: "error create article" });
  }
};

const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title_Produit, imageURL, price, description } = req.body;
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      {
        title_Produit,
        imageURL,
        price,
        description,
      },
      { new: true }
    );
    res.json({ message: "Article updated", updatedArticle });
  } catch (error) {
    res.status(400).json({ message: "error update article" });
  }
};

const deleteArticle = async (req, res) => {
  const articleId = req.params.id;
  try {
    const article = await Article.findByIdAndDelete(articleId);
    if (!article) {
      // Vérifiez si aucun article n'a été trouvé avec cet ID
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: " error delete" });
  }
};

export {
  getAllArticles,
  getArticle,
  creatArticle,
  deleteArticle,
  updateArticle,
};
