package types

import (
	"fmt"
	"mime/multipart"
	"os"
	"strings"
)

type FileInfo struct {
	OriginalName string `json:"originalName"`
	FileName string `json:"fileName"`
	FilePath string `json:"filePath"`
	Ext      string `json:"ext"`
	FullName string `json:"fullName"`
	Size     int64  `json:"size"`
	MimeType string `json:"mimeType"`
}

func (f *FileInfo) FromFile(path,fileName string, file *multipart.FileHeader){
	f.OriginalName = file.Filename
	// 获取文件扩展名
	if strings.LastIndex(f.OriginalName, ".") != -1 {
		f.Ext = file.Filename[strings.LastIndex(f.OriginalName, "."):]
	}
	f.FileName = fileName
	f.FileName = fmt.Sprintf("%s%s", f.FileName, f.Ext)
	f.Size = file.Size
	f.FullName = fmt.Sprintf("%s%s%s", path, string(os.PathSeparator), f.FileName)
	f.FilePath = path
	f.MimeType = file.Header.Get("Content-Type")
}