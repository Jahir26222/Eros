import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();


// Middleware setup
app.use(cors());
app.use(express.json());




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// // Serve the `uploads` folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//category Image upload
app.post('/category', upload.single('image'), async (req, res) => {
  try {
    const productData = {
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : '',
    };
    const CategoryData = new Category(productData); // Create a new product from request body
    await CategoryData.save(); // Save the product to the database
    res.status(201).json(CategoryData); // Respond with the created product
  } catch (error) {
    res.status(400).json({ error: 'Failed to create product', details: error.message });
  }
});





app.post('/product', upload.single('ProductImage'), async (req, res) => {
  try {
    const productData = {
      ...req.body,
      ProductImage: req.file ? `/uploads/${req.file.filename}` : '',
    };
    const product = new Product(productData); // Create a new product from request body
    await product.save(); // Save the product to the database
    res.status(201).json(product); // Respond with the created product
  } catch (error) {
    res.status(400).json({ error: 'Failed to create product', details: error.message });
  }
});

// 3. Update an existing product by ID (UPDATE)
app.put('/product/:id', upload.single('ProductImage'), async (req, res) => {
  try {
    const { id } = req.params;

    //Check if an image is being uploaded
    if (req.file) {
      req.body.ProductImage = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update product', details: error.message });
  }
});



// MongoDB connection string
const uri = "mongodb+srv://Nidhi:Nidhi16@sweetnamkeen.3md1r.mongodb.net/SweetNamkeen?retryWrites=true&w=majority&appName=SweetNamkeen";

// Define the schema and model
const ProductSchema = new mongoose.Schema({
  ProductName: String,
  ProductDescription: String,
  ProductIngredients: String,
  ProductWeight: String,
  Price: String,
  ShelfLife: String,
  ProductImage: Array,
  Category: String,
  StateOrigin: String,
  ProductNutritions: String,
  StorageInstruction: String,
});

const CategorySchema = new mongoose.Schema({
  name: String,
  image: String,
});

const Category = mongoose.model('Category', CategorySchema, 'category')

const Product = mongoose.model('Product', ProductSchema, 'sweet');

app.get('/cat', async (req, res) => {
  try {
    const cat = await Category.find();
    res.json(cat);
  } catch (error) {
    console.log(error);

  }
})




app.get('/category2', async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $group: { _id: "$Category", count: { $sum: 1 } } },
      { $sort: { _id: 1 } } // Optional: Sort alphabetically by category
    ]);
    res.json(categories);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/category', async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "name",
          foreignField: "Category",
          as: "products"
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          image: 1,
        }
      }
    ]);

    res.json(categories);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas using Mongoose!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


// API endpoints

// 1. Fetch all products (READ)
app.get('/product', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.json(products); // Send products as JSON response
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/category', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const newCategory = new Category({ name }); // Ensure your database model matches
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


//Get product data By Id

app.get('/product/:id', async (req, res) => {
  try {
    const productId = req.params.id; // Extract the product ID from the URL
    const product = await Product.findById(productId); // Query the database by ID

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product); // Send the specific product as a response
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


////get category wise items
app.get('/product/category/:categoryName', async (req, res) => {
  try {
    const { categoryName } = req.params; // Extract category name from URL
    const products = await Product.find({ Category: categoryName }); // Fetch products by category name

    if (!products.length) {
      return res.status(404).json({ message: 'No products found in this category' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




// 2. Add a new product (CREATE)
app.post('/product', async (req, res) => {
  try {
    const product = new Product(req.body); // Create a new product from request body
    await product.save(); // Save the product to the database
    res.status(201).json(product); // Respond with the created product
  } catch (error) {
    res.status(400).json({ error: 'Failed to create product', details: error.message });
  }
});

// 3. Update an existing product by ID (UPDATE)
app.put('/product/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the route
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true }); // Update the product
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct); // Respond with the updated product
  } catch (error) {
    res.status(400).json({ error: 'Failed to update product', details: error.message });
  }
});

// 4. Delete a product by ID (DELETE)
app.delete('/product/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the route
    const deletedProduct = await Product.findByIdAndDelete(id); // Delete the product
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete product', details: error.message });
  }
});




// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
