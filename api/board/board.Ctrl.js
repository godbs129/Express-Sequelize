const { Board } = require('../../models');
const models = require('../../models');
const tokenLib = require('../../lib/token');

exports.Addboard = async (req, res) => {
    const { body } = req;
    const token = req.headers['authorization'];

    try {
        const decoded = await tokenLib.verifyToken(token);

        await Board.create({
            title: body.title,
            board: body.board,
            id: decoded.id,
        });

        console.log("글 작성 성공\n");
        return res.status(200).json({
            message: "글 작성 성공",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "서버 오류",
        });
    }
}

exports.Delboard = async (req, res) => {
    const { body } = req;

    try {
        const board = await models.Board.findOne({
            where: {
                idx: body.idx,
            },
        });

        if (!board) {
            return res.status(401).json({
                message: "글을 찾을 수 없습니다",
            });
        }

        await Board.destroy({
            where: {
                idx: body.idx,
            }
        });

        console.log("글 삭제 성공\n");
        return res.status(200).json({
            message: "글 삭제 성공",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "서버 오류",
        });
    }
}

exports.Readboard = async (req, res) => {
    const token = req.headers['authorization'];
    try {
        const decoded = await tokenLib.verifyToken(token);

        const board = await models.Board.findAll({
            where: {
                id: decoded.id
            }
        })

        if (!board) {
            return res.status(401).json({
                message: "글이 없습니다.",
            });
        }

        console.log("글 조회 성공\n");

        return res.status(200).json({
            board,
        });
    } catch (err) {
        return res.status(500).json({
            message: "서버 오류",
        });
    }
}

exports.Updateboard = async (req, res) => {
    const token = req.headers['authorization'];
    const { body } = req;

    try {
        const decoded = await tokenLib.verifyToken(token);

        const board = await models.Board.findOne({
            where: {
                idx: body.idx,
            }
        })

        if (!board) {
            return res.status(400).json({
                message: '게시글이 존재하지 않습니다.'
            })
        }

        Board.update({
            title: body.title,
            board: body.board,
        }, {
            where: { idx: body.idx }
        });

        console.log("글 수정 성공\n");
        return res.status(200).json({
            message: '글 수정 성공',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "서버 오류",
        })
    }
}