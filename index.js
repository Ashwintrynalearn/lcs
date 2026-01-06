import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// middlewares
// app.use(cors({ origin: true }));
const PORT = process.env.PORT || 5000;
// Allow all origins
app.use(cors({
  origin: (origin, callback) => {
    callback(null, origin || "*"); // dynamically reflect request origin
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


let dp = Array.from({length: 1001}, () => Array(1001).fill(-1));

function helper(a,sum,n){
    if(sum==0) return 1;
    if(n==0) return 0;
    if(dp[sum][n] != -1) return dp[sum][n];
    let left = 0;
    if(sum>=a[n-1]){
        left = helper(a,sum-a[n-1],n);
    }
    let right = helper(a,sum,n-1);
    dp[sum][n] = left + right;
    return dp[sum][n];
}


app.get("/api/ans", (req, res) => {
let a = req.query.a;
   let arr = [1,2,5,10];
  
    let ans = helper(arr,a,arr.length);
    res.json({ways: ans});
});

app.listen(PORT, () => console.log(`Server on PORT: ${PORT}`));
