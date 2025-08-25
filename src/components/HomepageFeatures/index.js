import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
    {
        title: '使用简单',
        Svg: require('@site/static/img/easyUse.svg').default,
        description: (
            <p>
                NexuMount从一开始就设计为易于安装，并且可以在所有平台上使用。
            </p>
        ),
    },
    {
        title: '多种存储',
        Svg: require('@site/static/img/variousStorage.svg').default,
        description: (
            <p>
                支持多个存储提供商，包括本地存储、百度网盘、阿里云盘、移动网盘 等，且易于拓展。
            </p>
        ),
    },
    {
        title: '支持 WebDAV',
        Svg: require('@site/static/img/supportWebDAV.svg').default,
        description: (
            <p>
                支持所有 WebDAV 存储，这是一种用于访问文件的标准。
            </p>
        ),
    },
    {
        title: '受保护的',
        Svg: require('@site/static/img/protected.svg').default,
        description: (
            <p>
                身份认证功能 对于没有权限的用户拒绝访问和操作。
            </p>
        ),
    },
    {
        title: '文件预览',
        Svg: require('@site/static/img/filePreview.svg').default,
        description: (
            <p>
                支持视频、音频、文档、PDF、图片预览等
            </p>
        ),
    },
    {
        title: '离线下载',
        Svg: require('@site/static/img/offlineDownload.svg').default,
        description: (
            <p>
                将种子内容离线下载到指定的目录內,需要苛刻的网络环境
            </p>
        ),
    },
];

function Feature({Svg, title, description}) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img"/>
            </div>
            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
