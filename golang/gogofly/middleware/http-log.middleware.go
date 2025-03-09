package middleware

import (
	"bytes"
	"encoding/json"
	"io"

	"github.com/gin-gonic/gin"
	"github.com/gogofly/global"
)


type responseWriter struct {
	gin.ResponseWriter
	b *bytes.Buffer
}

func (w responseWriter) Write(b []byte) (int, error) {
	//向一个bytes.buffer中写一份数据来为获取body使用
	w.b.Write(b)
	//完成gin.Context.Writer.Write()原有功能
	return w.ResponseWriter.Write(b)
}

func HttpLog() gin.HandlerFunc {
	return func(c *gin.Context) {
		writer := responseWriter{
			c.Writer,
			bytes.NewBuffer([]byte{}),
		}

		c.Writer = writer
		authorization := c.Request.Header.Get("Authorization")
		path := c.Request.URL.Path
		query := c.Request.URL.Query()	
		method := c.Request.Method
		bodyAsByteArray, _ := io.ReadAll(c.Request.Body) 
		jsonBody := string(bodyAsByteArray)
		c.Request.Body = io.NopCloser(bytes.NewBufferString(jsonBody))
		c.Next()
		
		bodyMap := make(map[string]any)
		_ = json.Unmarshal([]byte(jsonBody), &bodyMap)

		responseMap := make(map[string]any)
		_ = json.Unmarshal(writer.b.Bytes(), &responseMap)
		

		data := map[string]any{
			"path": path,
			"query": query,
			"method": method,
			"authorization": authorization,
			"body": bodyMap,
			"response": responseMap,
			"status": c.Writer.Status(),
		}

		jsonBuf, _ := json.Marshal(data)

		var jsonStrBuf bytes.Buffer
		_ = json.Indent(&jsonStrBuf, jsonBuf, "", "  ")


		global.Logger.Info(jsonStrBuf.String())
		
	}
	
}