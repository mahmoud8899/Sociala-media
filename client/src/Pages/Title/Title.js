import { Helmet } from "react-helmet"

const Title = ({ title }) => {


    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
        </Helmet>

    )
}



export default Title