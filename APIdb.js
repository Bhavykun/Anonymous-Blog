import express from "express";
import pg from "pg";
import cors from "cors";

const app = express();
const port = 4000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "blog",
  password: "postgres",
  port: 5432,
});

db.connect();

//middlewares:
// Middleware functions are functions that have access to the
// request object (req), the response object (res), and the
// next middleware function in the application’s request-response
// cycle.

// These are the functions that sits between the request
// from the client and the response from the server. Its used
// to process, modify or handle the incoming request before it
// reaches the main app logic or before sending the response back to client
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//get all the posts from the db
app.get("/posts", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM blog ORDER BY id ASC");
    res.json(result.rows);
    console.log(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to restrive posts" });
  }
});

//get a specific post by id
app.get("/posts/:id", async (req, res) => {
  const postId = parseInt(req.params.id);
  try {
    const result = await db.query("SELECT * FROM blog WHERE id = $1", [
      postId,
    ]);
    if (result.rows.length == 0) {
      return res.status(404).json({ message: "post not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrive post" });
  }
});

//post a new post
app.post("/posts", async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO blog (title,content,author) VALUES($1,$2,$3) RETURNING *",
      [title, content, author]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to create post" });
  }
});

//patch a post by id
app.patch("/posts/:id", async (req, res) => {
  const postid = parseInt(req.params.id);
  const { title, content, author } = req.body;
  try {
    const fields = [];
    const values = [];
    let query = "UPDATE blog SET ";
    let idx = 1;


    if (title) {
      fields.push(`title = $${idx++}`);
      values.push(title);
    }
    if (content) {
      fields.push(`content = $${idx++}`);
      values.push(content);
    }
    if (author) {
      fields.push(`author = $${idx++}`);
      values.push(author);
    }

    if (fields.length === 0)
      return res.status(400).json({ error: "No fields to update" });

    query += fields.join(", ") + ` WHERE id = $${idx} RETURNING *`;
    values.push(postid);

    const result = await db.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Post not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update post" });
  }
});

//delete a post by id
app.delete("/posts/:id", async (req, res) => {
  const postId = parseInt(req.params.id);
  try {
    const result = await db.query("DELETE FROM blog WHERE id = $1 RETURNING *", [postId]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Post not found" });

    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

app.listen(port, () => {
  console.log("Running");
});
