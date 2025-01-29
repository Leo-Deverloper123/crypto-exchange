# Cryptocurrency Exchange Platform

## ER Diagram Documentation

This repository contains the ER (Entity-Relationship) diagram for our cryptocurrency exchange platform. The diagram is created using PlantUML.

### วิธีการดู ER Diagram

มี 2 วิธีในการดู ER Diagram:

#### 1. ใช้ Online PlantUML Editor
1. เข้าไปที่ http://www.plantuml.com/plantuml/uml/
2. Copy เนื้อหาจากไฟล์ `er-diagram.puml` ไปวางในช่อง Editor
3. กด Submit หรือ Refresh เพื่อดูแผนภาพ

#### 2. ใช้ VSCode + PlantUML Extension
1. ติดตั้ง Extension "PlantUML" ใน VSCode
2. เปิดไฟล์ `er-diagram.puml`
3. กด Alt + D เพื่อดูแผนภาพ (หรือคลิกขวา แล้วเลือก "Preview Current Diagram")

### รายละเอียด Entities

#### User
- id (PK, UUID)
- username (Unique)
- email (Unique)
- password (Hashed)
- status (ENUM: active, suspended)

#### Wallet
- id (PK, UUID)
- userId (FK -> User)
- currency (ENUM: BTC, ETH, XRP, DOGE, THB, USD)
- balance (DECIMAL)
- address (Optional, for crypto wallets)

#### Transaction
- id (PK, UUID)
- fromWalletId (FK -> Wallet)
- toWalletId (FK -> Wallet)
- amount (DECIMAL)
- currency (ENUM: BTC, ETH, XRP, DOGE, THB, USD)
- type (ENUM: internal, external, exchange)
- status (ENUM: pending, completed, failed)
- externalAddress (Optional)

#### Order
- id (PK, UUID)
- userId (FK -> User)
- type (ENUM: buy, sell)
- baseCurrency (ENUM: BTC, ETH, XRP, DOGE)
- quoteCurrency (ENUM: THB, USD)
- amount (DECIMAL)
- price (DECIMAL)
- status (ENUM: open, filled, cancelled)
- filledAmount (DECIMAL)

### ความสัมพันธ์
1. User 1:N Wallet
   - ผู้ใช้หนึ่งคนมีได้หลายกระเป๋าเงิน (แต่ละสกุล)

2. User 1:N Order
   - ผู้ใช้หนึ่งคนสร้างได้หลายคำสั่งซื้อ/ขาย

3. Wallet 1:N Transaction (as fromWallet)
   - กระเป๋าเงินหนึ่งสามารถเป็นต้นทางของหลายธุรกรรม

4. Wallet 1:N Transaction (as toWallet)
   - กระเป๋าเงินหนึ่งสามารถเป็นปลายทางของหลายธุรกรรม

### ข้อจำกัดและกฎเกณฑ์
1. ผู้ใช้ต้องมีกระเป๋าเงินครบทุกสกุล (BTC, ETH, XRP, DOGE, THB, USD)
2. ยอดเงินในกระเป๋าต้องไม่ติดลบ
3. การทำธุรกรรมต้องตรวจสอบยอดเงินก่อนทำรายการ
4. คำสั่งซื้อ/ขายต้องมีเงินพอในกระเป๋าก่อนทำรายการ
