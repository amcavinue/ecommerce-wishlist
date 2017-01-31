const actions = require('../actions/index');
const store = require('../store');
const update = require('react-addons-update');
const combineReducers = require('redux').combineReducers;

const initialState = {
    isLoggedIn: false,
    wishlist: [{"title":"Utopia Towels 8-Piece Cotton Machine Washable Towel Set with 2 Bath Towel, 2 Hand Towel and 4 Wash Cloths, Grey","img":"https://images-na.ssl-images-amazon.com/images/I/61MgRF-9z1L.jpg","price":"$59.99","description":["Set includes two bath towels (27 inch x 54 inch), two hand towels (16 inch x 28 inch), and four washcloths (13 inch x 13 inch)","Woven with 100% ring spun cotton","Machine washable, tumble dry on low","For best results, wash separately on first use to minimize lint.","Made from natural materials and free from harmful chemicals and synthetic materials, safe for you & your family"],"asin":"B00GQP0XTQ","link":"https://www.amazon.com/Utopia-Towels-8-Piece-Machine-Washable/dp/B00GQP0XTQ…nkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00GQP0XTQ"},{"title":"Pinzon Egyptian Cotton 6-Piece Towel Set, Grey","img":"https://images-na.ssl-images-amazon.com/images/I/51Daq5WAQrL.jpg","price":"$21.99","description":["Towel set includes 2 bath towels, 2 hand towels, and 2 washcloths","Woven with heavyweight Egyptian Cotton for softness, absorbency, and durability","Machine washable and dryable. For best use, wash separately on first use. You may see some lint on the first wash which will diminish after each washing. This will not affect the look, feel, or performance of your towel set","Bath towels measure 30 x 56 inches, hand towels measure 18 x 30 inches, washcloths measure 13 x 13 inches"],"asin":"B002S52ZKS","link":"https://www.amazon.com/Pinzon-Egyptian-Cotton-6-Piece-Towel/dp/B002S52ZKS%3…nkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB002S52ZKS"},{"title":"AmazonBasics Fade-Resistant Cotton 6-Piece Towel Set, Navy Blue","img":"https://images-na.ssl-images-amazon.com/images/I/51wkhosuMbL.jpg","price":"$17.99","description":["6-piece towel set includes (2) 54 x 30 inch bath towels, (2) 26 x 16 inch hand towels, and (2) 12 x 12 inch washcloths","Made of 100% cotton for softness and tear-resistant strength","Lightweight towels quickly absorbs moisture","Designed with a classic and simple pique border","Fade-resistant navy-blue color"],"asin":"B00Q7JFDKK","link":"https://www.amazon.com/AmazonBasics-Fade-Resistant-Cotton-6-Piece-Set/dp/B0…nkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00Q7JFDKK"},{"title":"Luxury Hotel & Spa Bath Towel 100% Genuine Turkish Cotton, 27\" x 54\" ,Set of 4,White","img":"https://images-na.ssl-images-amazon.com/images/I/51NUQDPK9pL.jpg","price":"$69.99","description":["Imported Made(Manufactured) in Denizli,Turkey","Set of 4 Bath Towels","Soft, Luxurious, Durable, Elegant, Absorbent, and Stylish","Dimensions: 27 x 54 Inches, 700+ GSM (grams per square meter)","Machine Washable and Dryable"],"asin":"B00HTB2XOO","link":"https://www.amazon.com/Luxury-Hotel-Genuine-Turkish-Cotton/dp/B00HTB2XOO%3F…nkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00HTB2XOO"},{"title":"7-Pack: 27\" x 52\" 100% Cotton Extra-Absorbent Bath Towels","img":"https://images-na.ssl-images-amazon.com/images/I/510ndPDr7yL.jpg","price":"$35.00","description":["100% Cotton","Each towel measures 27\" x 52\"","Each towel weighs 1lb","Machine wash warm with colors. Tumble dry. Do not bleach.","Each set includes a random assortment of 7 towels from the following colors: Black, Brown, Light Blue, Blue, Dark Blue, Yellow, Green, Light Green, Red, and Beige"],"asin":"B00FN4PP9Y","link":"https://www.amazon.com/7-Pack-100%25-Cotton-Extra-Absorbent-Towels/dp/B00FN…nkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00FN4PP9Y"},{"title":"700 GSM Premium Bath Towels Set - Cotton Towels for Hotel and Spa, Maximum Softness and Absorbency by Utopia Towels (4 Pack, Grey)","img":"https://images-na.ssl-images-amazon.com/images/I/61nCRmh-GZL.jpg","price":"$59.99","description":["Set includes four 700 GSM premium bath towels in grey measuring 27 by 54 inches","Woven with 100% ring spun cotton","Machine washable, tumble dry on low","For best results, wash separately on first use to minimize lint","Made from natural materials and free from harmful chemicals and synthetic materials, safe for you & your family"],"asin":"B01GJTDLBA","link":"https://www.amazon.com/700-GSM-Premium-Bath-Towels/dp/B01GJTDLBA%3Fpsc%3D1%…nkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB01GJTDLBA"},{"title":"Cotton Large Hand Towels (Grey, 4-Pack,16 x 28 inches) - Multipurpose Use for Bath, Hand, Face, Gym and Spa - By Utopia Towels","img":"https://images-na.ssl-images-amazon.com/images/I/61wyovZ8b5L.jpg","price":"$26.99","description":["Set includes four premium cotton large hand towels in grey measuring 16 by 28 inches","Woven with 100% ring spun cotton","Machine washable, tumble dry on low","For best results, wash separately on first use to minimize lint","Made from natural materials and free from harmful chemicals and synthetic materials, safe for you & your family"],"asin":"B00MYI39G8","link":"https://www.amazon.com/Cotton-Large-Towels-4-Pack-inches/dp/B00MYI39G8%3Fps…nkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00MYI39G8"},{"title":"AmazonBasics Cotton Washcloths, 24 - Pack","img":"https://images-na.ssl-images-amazon.com/images/I/41IX99CZ6WL.jpg","price":"$13.99","description":["Pack of 24 washcloths for bath, office, or gym use","Made of 100% looped-terry cotton for strength, high absorbency, and fast drying","Soft enough for use on the face and strong enough for general household cleaning","Reinforced edges to prevent unraveling","Machine washable and dryer safe"],"asin":"B010S5VXKC","link":"https://www.amazon.com/AmazonBasics-Cotton-Washcloths-24-Pack/dp/B010S5VXKC…nkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB010S5VXKC"},{"title":"ALBAKOS Turkish Cotton Hand Towel, 16-by-30-Inch (Set of 6) - White","img":"https://images-na.ssl-images-amazon.com/images/I/51bbXqvtBcL.jpg","price":"$37.99","description":["American Pillowcase is the only authorized seller of these hand towels. If out of stock, please check back in a few days. All other sellers are selling counterfeit","6 Luxury Hand Towels 16\"x30\" - White","Extra thick weave. 700+ gsm. All hems are double-stitched for extra durability","Oeko-Tex® and ISO 9001. All Materials are Pesticide and Harmful Chemical Free!","White is vat dyed for 6+ hours so will remain bright"],"asin":"B00GEFSCIM","link":"https://www.amazon.com/ALBAKOS-Turkish-Cotton-Towel-30-Inch/dp/B00GEFSCIM%3…nkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00GEFSCIM"},{"title":"Better Homes and Gardens Thick and Plush Bath Towel","img":"https://images-na.ssl-images-amazon.com/images/I/51Ho-L%2BMW7L.jpg","price":"$25.94","description":["Soft and Thick absorbent Bath Towel","Rich look and generously sized","Size: 56 inch L * 30 inch W * 1 inch H","Material Content: 100 % Egyptian Cotton Loops","Care Instructions: Wash before use. Avoid contact with skin treatment products. Machine wash warm with like colors. Normal cycle with mild detergent. Do not bleach. Tumble dry low. Do not iron."],"asin":"B00N70PSBQ","link":"https://www.amazon.com/Better-Homes-Gardens-Thick-Plush/dp/B00N70PSBQ%3Fpsc…nkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00N70PSBQ"}],
    results: null,
    loggedOutPages: [
      {
        text: 'Login',
        path: '/login'  // All paths must have preceding '/'.
      },
      {
        text: 'Sign Up',
        path: '/newuser'
      }
    ], // The ordering of these pages affects the order of the menu.
    loggedInPages: [
      {
        text: 'Product Search',
        path: '/search'
      },
      {
        text: 'Logout',
        path: null,
        id: 'logout'
      }
    ] // The ordering of these pages affects the order of the menu.
};

const loggedInReducer = (state = initialState.isLoggedIn, action) => {
  if (action.type === actions.NEW_USER_SUCCESS) {
    waitingDialog.hide();
    window.location = "/#/";
    bootbox.alert('Congratulations! Your username has been added. Please log in.');
    return state;
    
  } else if (action.type === actions.NEW_USER_ERROR) {
    waitingDialog.hide();
    if (action.err.response.status === 409) {
      bootbox.alert('That username is already taken. Please choose another.');
    } else {
      bootbox.alert('There was a server error. Please try again later.');
    }
    return state;
    
  } else if (action.type === actions.LOGIN_SUCCESS) {
    waitingDialog.hide();
    window.location = "/#/search";
    return update(state, {$set: true});
    
  } else if (action.type === actions.LOGIN_ERROR) {
    waitingDialog.hide();
    if (action.err.response.status === 401) {
      bootbox.alert('Incorrect username or password.');
    } else {
      bootbox.alert('There was a server error. Please try again later.');
    }
    return state;
    
  } else if (action.type === actions.LOGOUT) {
    sessionStorage.removeItem('ecommerceAppToken');
    window.location = "/#/";
    waitingDialog.hide();
    return update(state, {$set: false});
    
  } 
  return state;
}

const loggedOutPagesReducer = (state = initialState.loggedOutPages, action) => {
  return state;
}

const loggedInPagesReducer = (state = initialState.loggedInPages, action) => {
  return state;
}

const wishlistReducer = (state = initialState.wishlist, action) => {
  
  return state;
}

const resultsReducer = (state = initialState.results, action) => {
  if (action.type === actions.PRODUCTS_SUCCESS) {
    waitingDialog.hide();
    return update(state, {$set: action.data});
    
  } else if (action.type === actions.PRODUCTS_ERROR) {
    waitingDialog.hide();
    bootbox.alert('There was an error connecting to Amazon. Please try again later.');
    return state;
    
  } else if (action.type === actions.PRODUCT_SUCCESS) {
    return state;
    
  } else if (action.type === actions.PRODUCT_ERROR) {
    return state;
    
  }
  return state;
}

const reducer = combineReducers({
    isLoggedIn: loggedInReducer,
    loggedOutPages: loggedOutPagesReducer,
    loggedInPages: loggedInPagesReducer,
    wishlist: wishlistReducer,
    results: resultsReducer
});

exports.reducer = reducer;