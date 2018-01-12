import React, { Component } from 'react';
import styles from '../../styles/containers/login';
import classnames from 'classnames';
import { imgUrl } from '../../../util/loginBgImg';
import { createHashHistory } from 'history';

const history = createHashHistory();

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num1: 0,
            num2: 1,
            imgShow: false,
            corrected: true
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        this.imgShowTimer = setInterval(() => {
            this.setState({
                imgShow: !this.state.imgShow
            });
        }, 4000);
        this.imgUrlTimer = setInterval(() => {
            if (this.state.num1 === imgUrl.length - 2) {
                this.setState({
                    num1: 0
                });
                setTimeout(() => {
                    this.setState({
                        num2: 1
                    });
                }, 4000);
            } else {
                this.setState({
                    num1: this.state.num1 + 2
                });
                setTimeout(() => {
                    this.setState({
                        num2: this.state.num2 + 2
                    });
                }, 4000);
            }
        }, 8000);
    }
    componentWillUnmount() {
        clearInterval(this.imgShowTimer);
        clearInterval(this.imgUrlTimer);
    }
    handleClick() {
        history.push('/app');
    }
    render() {
        return (
            <div className={styles.loginBg}>
                <img className={classnames({ [styles.loginBgImg]: true, [styles.imgShow]: !this.state.imgShow, [styles.imgHide]: this.state.imgShow })} src={imgUrl[this.state.num1]} />
                <img className={classnames({ [styles.loginBgImg]: true, [styles.imgHide]: !this.state.imgShow, [styles.imgShow]: this.state.imgShow })} src={imgUrl[this.state.num2]} />
                <div className={styles.textInput}>
                    <input className={styles.flexrow} type="text" />
                </div>
                <div className={styles.loginBtn}>
                    <button onClick={this.handleClick}>test</button>
                </div>
            </div>
        );
    }
}

export default Login;