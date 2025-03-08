package auth

import (
	"github.com/gin-gonic/gin"
	"github.com/gogofly/api/base"
)

type IAuthApi struct{
	*base.BaseApi
}

var AuthApi *IAuthApi

func init() {
	AuthApi = &IAuthApi{}
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
	// base.OK(ctx, "登录成功")

	m.FailWithBadRequest(ctx, "登录失败")
}
