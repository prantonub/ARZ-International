import Hero2 from '../../component/Hero2';
import Fqa from '../FQA/Fqa';
import TopDestinations from '../../component/TopDestinations';
import SuccessStories from '../../component/SuccessStories';
import WhatWeDo from '../../component/WhatWeDo';
import ApplicationForm from '../../Form/ApplicationForm';

const Home = () => {
    return (
        <div>
            <Hero2 />

            <SuccessStories />

            <TopDestinations />

            <WhatWeDo />

            <div id="form">
                <ApplicationForm />
            </div>

            <Fqa />
        </div>
    );
};

export default Home;
