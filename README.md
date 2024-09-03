# Upload Image React App

## Giới Thiệu

Ứng dụng **Upload Image React App** cho phép người dùng tải lên tối đa 4 ảnh, xem liên kết của những ảnh đã tải lên và sao chép chúng một cách dễ dàng. Với giao diện người dùng hiện đại và trực quan, ứng dụng hỗ trợ cả kéo và thả (drag & drop) và chọn tệp từ máy tính. Các thông báo và hiệu ứng loading được thiết kế để mang lại trải nghiệm mượt mà và dễ chịu.

## Tính Năng

- **Tải lên ảnh**: Hỗ trợ kéo và thả hoặc chọn ảnh từ máy tính.
- **Giới hạn số lượng**: Chỉ cho phép tải lên tối đa 4 ảnh.
- **Hiển thị liên kết ảnh**: Hiển thị liên kết của các ảnh đã tải lên với nút sao chép.
- **Thông báo mượt mà**: Thông báo thành công hoặc lỗi được hiển thị với hiệu ứng mượt mà.
- **Hiệu ứng loading**: Hiệu ứng loading toàn màn hình khi đang tải ảnh.

## Cài Đặt

### Yêu Cầu

- Node.js (>= 14.x)
- npm hoặc yarn

### Cài Đặt Dự Án

1. **Clone repository**

    ```bash
    git clone https://github.com/Aedotris/UploadImage.git
    ```

2. **Cài đặt các phụ thuộc**

    ```bash
    cd UploadImage
    npm install
    ```

    hoặc

    ```bash
    yarn install
    ```

3. **Chạy ứng dụng**

    ```bash
    npm start
    ```

    hoặc

    ```bash
    yarn start
    ```

    Ứng dụng sẽ chạy tại `http://localhost:3000`.

## Sử Dụng

1. **Kéo và Thả hoặc Chọn Tệp**

   - Kéo và thả các ảnh vào vùng kéo và thả hoặc nhấp vào "Browse Files" để chọn các ảnh từ máy tính.
   - Lưu ý: Tối đa 4 ảnh có thể được tải lên cùng một lúc.

2. **Hiển Thị Liên Kết**

   - Sau khi tải lên thành công, liên kết của từng ảnh sẽ được hiển thị dưới vùng tải lên.
   - Bạn có thể sao chép liên kết bằng cách nhấp vào nút sao chép bên cạnh mỗi liên kết.

3. **Thông Báo**

   - Thông báo sẽ xuất hiện khi ảnh được tải lên thành công hoặc khi có lỗi xảy ra.
   - Thông báo sẽ tự động biến mất sau 2 giây và có hiệu ứng trượt xuống và trượt lên.

## Hiệu Ứng và Tùy Chỉnh

- **Hiệu ứng Loading**: Sử dụng anime.js để tạo hiệu ứng quay vòng cho phần loading.
- **Thông Báo**: Sử dụng anime.js để tạo hiệu ứng trượt cho thông báo.
- **CSS**: Sử dụng Tailwind CSS để thiết kế giao diện hiện đại và dễ sử dụng.

## Các API

- **Endpoint Upload**: `/api/upload`
  - **Method**: POST
  - **Body**: `multipart/form-data` chứa tệp ảnh.
  - **Response**: `{ "link": "URL của ảnh đã tải lên" }`

## Tương Thích

- **Trình duyệt**: Hỗ trợ các trình duyệt hiện đại bao gồm Chrome, Firefox, Safari, và Edge.

## Góp Ý và Báo Cáo Lỗi

- Để góp ý hoặc báo cáo lỗi, vui lòng mở một issue tại [GitHub Issues](https://github.com/Aedotris/UploadImage/issues).



