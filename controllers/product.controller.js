import Prisma from "../lib/prisma.js";

const getProducts = async (req, res) => {
  try {
    const products = await Prisma.product.findMany();

    if (products.length === 0) {
      return res.status(404).json({ message: "No products available" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving products" });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const productId = crypto.randomUUID();
    if (!name || price == null || !description) {
      return res
        .status(400)
        .json({ message: "Name, price, and description are required" });
    }

    const newProduct = await Prisma.product.create({
      data: {
        id: productId,
        name,
        price,
        description,
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Prisma.product.delete({
      where: { id: productId },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the product" });
  }
};

export { getProducts, addProduct, deleteProduct };
