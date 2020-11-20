const { Board } = require('../../models');
const models = require('../../models');

exports.Addboard = async (req, res) => {
    const { body } = req;

    try {
        await Board.create({
            title: body.title,
            board: body.board,
            id: body.id,
        });

        console.log("글 작성 성공");
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

        console.log("글 삭제 성공");
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