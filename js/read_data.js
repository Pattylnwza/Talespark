// 1. นำเข้าฟังก์ชันทั้งหมดที่ต้องใช้ไว้บนสุดของไฟล์
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from "./firebase.js";

// ------------------------------------------------
// ฟังก์ชันเพิ่มข้อมูล (จากโค้ดชุดแรก)
// ------------------------------------------------
async function addUser() {
  // ... โค้ดเพิ่มข้อมูล ...
}

// ------------------------------------------------
// ฟังก์ชันดึงข้อมูลแบบครั้งเดียว (วิธีที่ 2)
// ------------------------------------------------
async function displayUsers() {
  const userListDiv = document.getElementById("user-list");
  userListDiv.innerHTML = "กำลังโหลดข้อมูล..."; 

  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    userListDiv.innerHTML = ""; 
    
    querySnapshot.forEach((doc) => {
    // ตรวจสอบว่ามีคะแนนหรือไม่ ถ้าไม่มีให้แสดงเป็น 0
    const score1 = user.score_minigame1 || 0;
    const score2 = user.score_minigame2 || 0;
    const totalScore = score1 + score2;

    userElement.textContent = `ชื่อ: ${user.name} | ด่าน 1: ${score1} | ด่าน 2: ${score2} | รวม: ${totalScore}`;
    userListDiv.appendChild(userElement);
    });
  } catch (error) {
    console.error("ดึงข้อมูลไม่สำเร็จ:", error);
  }
}

// 3. สั่งเรียกใช้งานฟังก์ชันที่ต้องการ
// addUser(); // ปิดไว้ถ้ายังไม่อยากเพิ่มข้อมูลซ้ำ
displayUsers(); // เรียกดึงข้อมูลมาแสดงผล