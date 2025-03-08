package baseinfo

import (
	"github.com/gin-gonic/gin"
	"github.com/gogofly/api/base"
)

type IUserApi struct{
	*base.BaseApi
}

var UserApi *IUserApi

func init() {
	UserApi = &IUserApi{}
}

func (u *IUserApi) GetInfo(ctx *gin.Context) {
	u.OK(ctx, "success")
}
