import Prisma from "../lib/prisma.js";

async function getCartItems(req, res) {
  try {
    const userId = req.userId;

    const cartItems = await Prisma.cart.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: true,
      },
    });

    if (cartItems.length === 0) {
      return res.status(404).json({ message: "Your cart is empty." });
    }

    res.status(200).json(cartItems);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving cart items." });
  }
}

async function addToCart(req, res) {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required." });
    }

    const product = await Prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const existingCartItem = await Prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });

    if (existingCartItem) {
      const updatedCartItem = await Prisma.cart.update({
        where: {
          userId_productId: {
            userId: userId,
            productId: productId,
          },
        },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
      });

      return res.status(200).json(updatedCartItem);
    } else {
      const newCartItem = await Prisma.cart.create({
        data: {
          userId: userId,
          productId: productId,
          quantity: quantity,
        },
      });

      return res.status(201).json(newCartItem);
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while adding the product to the cart.",
    });
  }
}

async function deleteFromCart(req, res) {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const cartItem = await Prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });

    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Product not found in your cart." });
    }

    await Prisma.cart.delete({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });

    res
      .status(200)
      .json({ message: "Product removed from the cart successfully." });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while removing the product from the cart.",
    });
  }
}

export { getCartItems, addToCart, deleteFromCart };
