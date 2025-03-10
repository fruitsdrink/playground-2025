package middleware

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/gogofly/global/constant"
	"github.com/gogofly/modules/system/baseinfo/user"
	"github.com/gogofly/utils"
)

func tokenFail(c *gin.Context) {
	c.JSON(http.StatusUnauthorized, gin.H{
		"msg": "Unauthorized",
		"code": 401,
	})
	c.Abort()
}

func JwtAuth() gin.HandlerFunc {
	return func (c *gin.Context)  {
		token := c.GetHeader("Authorization")
		if token == "" || !strings.HasPrefix(token, "Bearer ") {
			tokenFail(c)
			return
		}

		token = token[len("Bearer "):]
		jwtCustClaims, err := utils.JwtTools.ParseToken(token)
		if err != nil {
			tokenFail(c)
			return
		}

		userId := strconv.Itoa(int(jwtCustClaims.Id))
		if(userId == "0") {
			tokenFail(c)
			return
		}

		userService := user.NewService()
		user, err := userService.FindOne(uint(jwtCustClaims.Id))
		if err != nil {
			tokenFail(c)
			return
		}
		if user == nil {
			tokenFail(c)
			return
		}
		if user.Status != 1 {
			tokenFail(c)
			return
		}

		c.Set(constant.CurrentUser, user)
		
		c.Next()
	}
}