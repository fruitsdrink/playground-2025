package validators

import "github.com/go-playground/validator/v10"

var NotEmptyTag = "not_empty"

// NotEmpty 验证器：非空
func NotEmpty(fl validator.FieldLevel) bool {
	if value, ok := fl.Field().Interface().(string); ok {
		return len(value) > 0
	} else {
		return false
	}
}