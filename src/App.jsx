import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// 🔗 LINK BACKEND CỦA BẠN (Lấy từ Render)
const API_URL = "https://todo-backend-api-d92s.onrender.com/todos";

function App() {
  // Khởi tạo state để lưu danh sách và ô nhập liệu
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // Thêm trạng thái loading cho chuyên nghiệp

  // 1️⃣ Khi web vừa mở lên -> Gọi API lấy danh sách về
  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi kết nối Backend:", err);
        setLoading(false);
      });
  }, []);

  // 2️⃣ Hàm thêm công việc mới (Gửi lên Backend)
  const addTodo = async () => {
    if (!input.trim()) return; // Không cho nhập rỗng

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const newTodo = await res.json();

      // Cập nhật giao diện ngay lập tức (Thêm cái mới vào đầu danh sách)
      setTodos([newTodo, ...todos]);
      setInput(""); // Xóa trắng ô nhập
    } catch (error) {
      alert("Lỗi không thể thêm! Kiểm tra lại Backend Render.");
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React + Render DB</h1>
      <h1>Báo cáo Bài tập: Fullstack CI/CD</h1>
      <h2>Sinh viên: Trần Hữu Phước</h2>

      <div className="card">
        {/* Phần nhập liệu */}
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <input
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập việc cần làm..."
            onKeyDown={(e) => e.key === "Enter" && addTodo()} // Bấm Enter cũng thêm được
          />
          <button onClick={addTodo}>Thêm</button>
        </div>

        {/* Phần hiển thị danh sách */}
        {loading ? (
          <p>⏳ Đang tải dữ liệu từ Render...</p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              textAlign: "left",
              maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            {todos.length === 0 && (
              <p style={{ textAlign: "center" }}>Chưa có công việc nào.</p>
            )}

            {todos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  background: "#2a2a2a",
                  margin: "10px 0",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #444",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>✅ {todo.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="read-the-docs">
        Dữ liệu được lưu trữ vĩnh viễn trên PostgreSQL (Render)
      </p>
    </>
  );
}

export default App;
