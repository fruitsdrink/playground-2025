package utils

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/spf13/viper"
)

type jwtCustomClaims struct {
	Id uint `json:"id"`
	Username string `json:"username"`
	jwt.RegisteredClaims
}

type jwtTools struct {
	
}

var JwtTools *jwtTools
var _secret string

func init() {
	JwtTools = &jwtTools{}
	
}

func getSecret() string {
	if _secret != "" {
		return _secret
	}
	_secret = viper.GetString("jwt.secret")

	if _secret == "" {
		_secret = "gogofly_secret"
	}
	return _secret
}

func getExpiresAt() time.Duration {
	expiresAt := viper.GetString("jwt.expiresAt")
	parsedDuration, durationErr := time.ParseDuration(expiresAt)
	if durationErr != nil {
		// 默认24h
		parsedDuration = 24 * time.Hour
	}
	return parsedDuration
}

/**
 * 生成token
 */
func (j *jwtTools) GenerateToken(id uint, username string) (string, error) {
	expiresAt := getExpiresAt()

	claims := jwtCustomClaims{
		Id: id,
		Username: username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(expiresAt)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Subject: "Token",
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	secret := getSecret()
	return token.SignedString([]byte(secret))
}

/**
 * 解析token
 */
func (j *jwtTools) ParseToken(tokenString string) (jwtCustomClaims, error) {
	var claims jwtCustomClaims
	secret := getSecret()
	token, err := jwt.ParseWithClaims(tokenString, &claims, func(token *jwt.Token) (any, error) {
		return []byte(secret), nil
	})
	if err != nil || !token.Valid {
		err = errors.New("token invalid")
		return jwtCustomClaims{}, err
	}
	return claims, nil
}

/**
 * 验证token
 */
 func (j *jwtTools) ValidateToken(tokenString string) bool {
	_, err := j.ParseToken(tokenString)
	return err == nil	
}