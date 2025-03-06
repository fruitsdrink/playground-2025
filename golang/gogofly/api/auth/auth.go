package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type IAuthApi struct{}

func NewAuthApi() *IAuthApi {
	return &IAuthApi{}
}

// @Tags 登录授权
// @Summary 登录
// @Accept json
// @Produce json
// @Router /api/v1/auth/login [post]
// @Param username formData string true "用户名"
// @Param password formData string true "密码"
// @Success 200 {object} map[string]interface{} "登录成功"
// @Failure 400 {object} map[string]interface{} "登录失败"
func (m *IAuthApi) Login(ctx *gin.Context) {
	ctx.AbortWithStatusJSON(http.StatusOK, gin.H{
		"code": 0,
		"msg":  "success",
		"data": nil,
	})
}
