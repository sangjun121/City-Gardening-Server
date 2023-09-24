//로그인을 꼭 해야되는 페이지와, 하지 않아도 되는 페이지 구분하는 미들웨어 작성
//req.isAuthenticated 함수를 이용하여 요청에 인증여부 확인
//exports와 module.exports의 차이?

exports.isLoggedIn = (req, res, next) => {
    // isAuthenticated()로 검사해 로그인이 되어있으면
    if (req.isAuthenticated()) {
        next(); //다음 미들웨어로 이동
    } else {
        res.status(403).json({ susscess: false, error: 'Need to log in' });
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next(); // 로그인 안되어있으면 다음 미들웨어
    } else {
        // const message = encodeURIComponent('로그인한 상태입니다.');
        // res.redirect(`/?error=${message}`);
        res.status(403).json({ susscess: false, error: 'Already loged in' });
    }
};
