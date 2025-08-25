import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className={clsx('container', styles.containerBanner)}>
                <div className={styles.containerBannerLeft}>
                    <Heading as="h1" className="hero__title">
                        {siteConfig.title}
                    </Heading>
                    <p className="hero__subtitle">🗂️ 一个支持多种存储的文件列表程序，使用 SpringBoot 3.x 和
                        Element-plus。</p>
                    <div className={styles.buttons}>
                        <Link
                            className="button button--secondary button--lg"
                            to="/docs/guide">
                            开始
                        </Link>
                    </div>
                </div>
                <div className={styles.containerBannerLogo}>
                    <img src="img/icon.png"/>
                </div>
            </div>
        </header>
    );
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="NexuMount文档">
            <HomepageHeader/>
            <main>
                <HomepageFeatures/>
            </main>
        </Layout>
    );
}
