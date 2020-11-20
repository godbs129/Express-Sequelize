const models = require('../../models');
const tokenLib = require('../../lib/token');
const crypto = require('crypto');

exports.login = async (req, res) => {
    const { body } = req;

    try {
        const user = await models.User.findOne({
            where: {
                id: body.id,
            },
        });

        if (!user) {
            return res.status(401).json({
                message: "아이디를 확인하세요",
            });
        }

        let dbPW = user.dataValues.pw;
        let inputPW = body.pw;
        let salt = user.dataValues.salt;
        let hashPW = crypto.createHash("sha512").update(inputPW + salt).digest('hex');

        const usera = await models.User.findOne({
            where: {
                id: body.id,
                pw: hashPW,
            },
        });

        if (!usera) {
            return res.status(401).json({
                message: "비밀번호를 확인하세요",
            });
        }
        const token = await tokenLib.creteToken(body.id);

        console.log(body.id + ' 로그인\n');
        return res.status(200).json({
            message: "로그인 성공",
            data: { 'token': token },
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "서버 오류",
        });
    }

}

exports.register = async (req, res) => {
    const { body } = req;

    try {
        const user = await models.User.findOne({
            where: {
                id: body.id,
            },
        });

        if (user) {
            return res.status(401).json({
                message: "이미 사용중인 아이디입니다",
            });
        }

        let inputPW = body.pw;
        let salt = Math.round((new Date().valueOf() + Math.random())) + "";
        let hashPW = crypto.createHash("sha512").update(inputPW + salt).digest('hex');

        await models.User.create({
            id: body.id,
            pw: hashPW,
            name: body.name,
            salt: salt
        });

        console.log(body.id + " 회원가입 성공\n");
        return res.status(200).json({
            message: "회원가입 성공",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "서버 오류",
        });
    }

}