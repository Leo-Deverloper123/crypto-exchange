# Cryptocurrency Exchange Platform

ระบบแลกเปลี่ยน Cryptocurrency ที่รองรับการซื้อขายและโอนเหรียญ cryptocurrency ระหว่างผู้ใช้

## คุณสมบัติ
- รองรับ cryptocurrencies: BTC, ETH, XRP, DOGE
- รองรับสกุลเงิน: THB, USD
- ระบบสมาชิก (ลงทะเบียน/เข้าสู่ระบบ)
- ระบบกระเป๋าเงิน (wallet) สำหรับแต่ละสกุลเงิน
- ระบบซื้อ-ขายแลกเปลี่ยน cryptocurrency
- ระบบโอนเงินระหว่างผู้ใช้
- ระบบบันทึกธุรกรรม

## ขั้นตอนการติดตั้ง

1. ติดตั้ง Dependencies:
```bash
npm install
```

2. ตั้งค่าฐานข้อมูล:
- ติดตั้ง PostgreSQL
- สร้างฐานข้อมูลชื่อ "crypto_exchange"

3. ตั้งค่าไฟล์ .env:
```env
DB_NAME=crypto_exchange
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
PORT=3000
```

4. เพิ่มข้อมูลทดสอบ (ถ้าต้องการ):
```bash
npm run seed
```

## วิธีการรัน

รันในโหมด Development:
```bash
npm run dev
```

รันในโหมด Production:
```bash
npm start
```

เซิร์ฟเวอร์จะทำงานที่ `http://localhost:3000`

## API Endpoints

### Users
- POST `/api/users/register` - ลงทะเบียนผู้ใช้ใหม่
- GET `/api/users/wallets` - ดูข้อมูลกระเป๋าเงินของผู้ใช้

### Orders
- POST `/api/orders` - สร้างคำสั่งซื้อ/ขาย
- GET `/api/orders` - ดูประวัติคำสั่งซื้อ/ขาย

## โครงสร้างโปรเจค
```
backend/
├── src/
│   ├── config/         # การตั้งค่าต่างๆ
│   ├── controllers/    # ตัวควบคุมการทำงาน
│   ├── models/         # โมเดลฐานข้อมูล
│   ├── routes/         # เส้นทาง API
│   ├── middleware/     # middleware
│   └── index.js        # entry point
├── .env                # ตั้งค่าสภาพแวดล้อม
└── package.json        # รายการ dependencies
```
