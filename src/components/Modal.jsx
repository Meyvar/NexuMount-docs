import React, { useState } from 'react';

export default function Modal({ text, title, iframeUrl, width = '800px', height = '500px' }) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            {/* 打开按钮 */}
            <button
                onClick={openModal}
                style={{
                    padding: '10px 16px',
                    backgroundColor: '#409eff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                {text}
            </button>

            {/* Modal */}
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999
                }}>
                    <div style={{
                        position: 'relative',
                        background: '#fff',
                        width: width,
                        height: height,
                        borderRadius: '8px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {/* 右上角关闭按钮 */}
                        <button
                            onClick={closeModal}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: 'transparent',
                                border: 'none',
                                fontSize: '20px',
                                cursor: 'pointer'
                            }}
                        >
                            ✕
                        </button>

                        <div style={{
                            background: '#fff',
                            width: '100%',
                            height: '50px',
                            display: 'flex',
                            'align-items': 'center',
                            'padding-left': '15px'
                        }}>
                            {title}
                        </div>

                        {/* iframe */}
                        <iframe
                            src={iframeUrl}
                            style={{ flex: 1, border: 'none', padding: '10px' }}
                            title="Modal Content"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
