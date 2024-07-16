# Airline management backend - SE104 Project

![image](https://raw.githubusercontent.com/chabuuuu/airline-management.frontend/main/picture/Screenshot_20240716_124059.png)

> Sự phát triển vượt trội của ngành du lịch hàng không trong thời đại ngày nay đã
> đẩy mạnh nhu cầu giải quyết hiệu quả bài toán quản lý các chuyến bay của các
> hãng hàng không cùng với tương tác một cách hiệu quả giữa hãng hàng không
> và khách hàng.Tuy vậy, với mô hình truyền thống việc quản lý số lượng lớn các
> chuyến bay bằng các loại giấy tờ đồng thời việc bán vé cũng phải thông qua
> nhiều thủ tục tiêu tốn số lượng lớn nhân lực, đó là lý do ta cần một hệ thống
> chuẩn hóa các quy trình quản lý bán vé chuyến bay, tránh khỏi những sai sót
> không đáng có.
> Đề xuất xây dựng Website quản lý bán vé máy bay giúp cả khách hàng và
> nhân viên sân bay dễ dàng xem thông tin, mua vé , đặt vé chuyến bay một
> cách khoa học, trực quan, hiện đại, mọi lúc, mọi nơi khi họ có máy tính kết nối
> Internet. Mục tiêu của bài toán là tạo ra một hệ thống phần mềm đáp ứng được
> các yêu cầu sau:

- Quản lý chuyến bay
- Quản lý sân bay
- Quản lý các quy định
- Quản lý bán vé
- Đặt vé, đặt chỗ và thanh toán
- Quản lý tài khoản (Customer/Staff LV1/Staff LV2)

# About this repository

Đây là source code backend của dự án, sử dụng các tech stack sau:

- Back end web application framework: ExpressJS (NodeJS)
- Client - Server Communicate: Restful API
- Backend (ExpressJS) repository: https://github.com/chabuuuu/airlane-management.backend

# About the final product

- Demo (guest user): http://csairs.website/
- Demo (staff user): http://csairs.website/StaffLogin
- API Documentation: [Postman API Document](https://documenter.getpostman.com/view/33824763/2sA3JJAj6K)

# About this source

- Flow: Controller --> Service --> Repository --> TypeORM Entity

- We combine all dependency in "container", then resolve and export the controller to use in routes

ORM: TypeORM

## Usage

### Development:

```
npm run start:dev
```

### Production:

```
npm run build
npm run start:prod
```

## Migration:

### Auto genrate migration file to /src/database/migration

```
npm run migration:generate
```

### Apply migration

```
npm run migration:start
```

### Sync database

```
npm run migration:sync
```

# About how to deploy this project

Components using:

- Frontend: https://github.com/chabuuuu/airline-management.frontend
- Backend: this repository
- MySQL
- Redis
- PDF Generate Server: https://github.com/chabuuuu/airline-management.report-server

## Architecture

![alt text](https://res.cloudinary.com/practicaldev/image/fetch/s--CDARQ4Hj--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/of739v9cu7namgc9m2am.jpg)

## How to create new API Endpoint:

- 1. Create new Entity Class in src/models
- 2. Create new repository and its repository interface in src/repository
- 3. Create new service and its service interface in src/service
- 4. Create new controller and its controller interface in src/controller
- 5. Combine all to container in src/container
- 6. Create new route in src/route

# About the team

- Hà Phú Thịnh - Backend Developer (Lead team backend)
- Nguyễn Viết Đức - Frontend Developer (Lead team frontend)
- Nguyễn Vũ Khai Tâm - Backend Developer
- Huỳnh Nhật Minh - Frontend Developer
- Đoàn Văn Hoàng - Frontend Developer
