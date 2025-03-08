package types

import "github.com/gin-gonic/gin"

type IFnRegisterRoute = func(publicRouterGroup *gin.RouterGroup, authRouterGroup *gin.RouterGroup)
type IFnInitRoute = func(fn IFnRegisterRoute)