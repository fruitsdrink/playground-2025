package modules

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
	"github.com/gogofly/validators"
)

func (m *App) RegisterValidator(r *gin.Engine) {
	if v, ok := binding.Validator.Engine().(*validator.Validate);ok {
		v.RegisterValidation(validators.NotEmptyTag, validators.NotEmpty)
	}
}