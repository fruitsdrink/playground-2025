package base

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gogofly/types"
)

type BaseApi struct{}

func (m *BaseApi) Test(ctx *gin.Context) {
	fmt.Println("test")
}

func (m *BaseApi) OK(ctx *gin.Context, data any) {
	ctx.AbortWithStatusJSON(http.StatusOK, types.ResponseJson[any]{
		Msg: "success",
		Data: data,
	})
}


func (m *BaseApi) FailWithCode(ctx *gin.Context, status int, code int, msg string) {
	ctx.AbortWithStatusJSON(status, types.ResponseJson[any]{
		Code: code,
		Msg: msg,
		Data: nil,
	})
}

func (m *BaseApi) Fail(ctx *gin.Context, status int, msg string) {
	m.FailWithCode(ctx, status, 0, msg)
}

func (m *BaseApi) FailWithBadRequest(ctx *gin.Context, msg string) {
	m.FailWithCode(ctx, http.StatusBadRequest, 0, msg)
}

func (m *BaseApi) FailWithNotFound(ctx *gin.Context, msg string) {
	m.FailWithCode(ctx, http.StatusNotFound, 0, msg)
}

func (m *BaseApi) FailWithUnauthorized(ctx *gin.Context) {
	m.FailWithCode(ctx, http.StatusUnauthorized, 0, "Unauthorized")
}

func (m *BaseApi) FailWithForbidden(ctx *gin.Context) {
	m.FailWithCode(ctx, http.StatusForbidden, 0, "Forbidden")
}

func (m *BaseApi) FailWithInternal(ctx *gin.Context) {
	m.FailWithCode(ctx, http.StatusInternalServerError, 0, "Internal Server Error")
}

func SendFile(ctx *gin.Context, fileName string, data []byte) {
	ctx.Header("Content-Disposition", "attachment; filename="+fileName)
	ctx.Data(http.StatusOK, "application/octet-stream", data)
}

func SendPicture(ctx *gin.Context, fileName string, data []byte) {
	ctx.Header("Content-Disposition", "attachment; filename="+fileName)
	ctx.Data(http.StatusOK, "image/jpeg", data)
}