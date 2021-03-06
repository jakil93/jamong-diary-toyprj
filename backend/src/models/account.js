const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");
const { generateToken } = require("../lib/token");

function hash(password) {
  return crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(password)
    .digest("hex");
}
const Account = new Schema({
  username: String,
  profile: {
    // thumbnail: { type: String, default: "/static/images/default_thumbnail.png" }
    thumbnail: String
  },
  social: {
    facebook: {
      id: String,
      accessToken: String
    },
    google: {
      id: String,
      accessToken: String
    }
  },
  password: String, // 로컬계정의 경우엔 비밀번호를 해싱해서 저장합니다
  thoughtCount: { type: Number, default: 0 }, // 서비스에서 포스트를 작성 할 때마다 1씩 올라갑니다
  createdAt: { type: Date, default: Date.now }
});

Account.statics.localLogin = function({ username, password }) {
  return this.findOne({ username, password: hash(password) });
};

Account.statics.localRegister = function({ username, password }) {
  // 데이터를 생성 할 때는 new this() 를 사용합니다.
  const account = new this({
    username: username,
    password: hash(password)
  });

  return account.save();
};

Account.methods.validatePassword = function(password) {
  const hashed = hash(password);
  return this.password === hashed;
};

Account.methods.generateToken = function() {
  const payload = {
    _id: this._id,
    username: this.username
  };

  return generateToken(payload, "account");
};
module.exports = mongoose.model("Account", Account);
