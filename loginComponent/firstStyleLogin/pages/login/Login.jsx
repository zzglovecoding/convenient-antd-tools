import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './login.less';
import { Form  } from 'antd';
import PropTypes from 'prop-types';

function Login(props) {
    const { getFieldDecorator } = props.form;

    return (
        <div className={styles.container}>
            <Form onSubmit={e => handleSubmit(e)}>
                
            </Form>
        </div>
    );
}

export default withRouter(Form.create({ name: 'Login' })(Login));

Login.propTypes = {
    form: PropTypes.object
};