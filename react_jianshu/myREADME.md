##  第四章笔记
### PropTypes 和 DefaultProps
    [PropTypes&&DefaultProps](https://react.docschina.org/docs/typechecking-with-proptypes.html#proptypes)
1.  propTypes
    父子组件传参，类型定义,是否必传等。。。功能强大，去官网看
    import PropTypes from 'prop-types'

    Todoitem.propTypes = {
        test:PropTypes.string.isRequired,   
        content: PropTypes.string.isRequired,
        DelTodo: PropTypes.func,
        index: PropTypes.number
    }
2.  DefaultProps
    Todoitem.defaultProps = {
        test: 'abc'
    }

### Props,State,Render