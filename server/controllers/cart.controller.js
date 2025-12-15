import cartProductModel from "../models/cartproduct.model.js";
import UserModel from "../models/user.model.js";

export const addToCartItemController = async (request, response) => {
  try {
    const userId = request.userId;
    const { productId } = request.body;

    if (!productId) {
      return response.status(402).json({
        message: "Provide productId",
        error: true,
        success: false,
      });
    }

    const checkItemCart = await cartProductModel.findOne({
      userId: userId,
      productId: productId,
    });

    if (checkItemCart) {
      return response.status(400).json({
        message: "Item already in cart",
      });
    }

    const cartItem = new cartProductModel({
      quantity: 1,
      userId: userId,
      productId: productId,
    });
    const save = await cartItem.save();

    const updateCartUser = await UserModel.updateOne(
      { _id: userId },
      {
        $push: {
          shopping_cart: productId,
        },
      }
    );

    return response.json({
      data: save,
      message: "",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getCartItemController = async (request, response) => {
  try {
    const userId = request.userId;

    const cartItem = await cartProductModel
      .find({
        userId: userId,
      })
      .populate("productId");

    return response.json({
      data: cartItem,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateCartItemController = async (request, response) => {
  try {
    const userId = request.userId;
    const { _id, qty } = request.body;

    if (!_id || !qty) {
      return response.status(400).json({
        message: "Provide _id,qty",
      });
    }
    const updateCartitem = await cartProductModel.updateOne(
      {
        _id: _id,
      },
      {
        quantity: qty,
      }
    );

    return response.json({
      message:"Update Cart",
      success:true,
      error:false,
      data:updateCartitem
    })
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteCartItemController = async(request,response)=>{
    try {
      const userId = request.userId 
      const { _id } = request.body 
      
      if(!_id){
        return response.status(400).json({
            message : "Provide _id",
            error : true,
            success : false
        })
      }

      const deleteCartItem  = await cartProductModel.deleteOne({_id : _id, userId : userId })

      return response.json({
        message : "",
        error : false,
        success : true,
        data : deleteCartItem
      })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}