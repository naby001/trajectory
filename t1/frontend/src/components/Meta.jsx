import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const Meta = ({
    title = "Trajectory 2025 | Jadavpur University’s Mechanical Fest",
    description = "Join Trajectory, the premier mechanical fest of Jadavpur University. Participate in thrilling competitions, workshops, and technical challenges.",
    keyword = "Trajectory, Mechanical Fest, JU Fest, Engineering Competitions, Workshops, Robotics, CAD Design, Debate, Data Analysis, JU Events",
    type = "website",
    link = "",
}) => {
    return (
        <Helmet>
            <link rel="canonical" href={`https://www.trajectoryjume.tech/${link}`} />
            <meta name="description" content={description} />
            <meta name="author" content="Trajectory 2025" />
            <meta name="keywords" content={keyword} />
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={`https://www.trajectoryjume.tech/${link}`} />
            <meta property="og:type" content={type} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:url" content={`https://www.trajectoryjume.tech/${link}`} />
        </Helmet>
    );
};

Meta.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string,
    keyword: PropTypes.string,
    type: PropTypes.string,
};

export default Meta;
