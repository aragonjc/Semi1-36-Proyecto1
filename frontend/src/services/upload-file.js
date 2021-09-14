import http from "../http/http-commons";

class UploadFilesService {
    upload(file, onUploadProgress) {
        let formData = new FormData();
        formData.append("file", file);
        return http.post("/files/upload", formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }
}

export default new UploadFilesService();