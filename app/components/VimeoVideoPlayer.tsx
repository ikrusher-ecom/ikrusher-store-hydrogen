import {useState} from 'react';
import {Button, Modal, Card, Avatar} from 'antd';

import playButtonIcon from '~/assets/play-button.svg';

const {Meta} = Card;

interface VimeoVideoPlayerProps {
  videoId: string;
  className?: string;
  width?: string;
  height?: string;
  title?: string;
}

export function VimeoVideoPlayer({
  videoId,
  className,
  width = '100%',
  height = '400px',
  title = 'Vimeo Video',
}: VimeoVideoPlayerProps) {
  if (!videoId) {
    console.error('VimeoEmbed requires a videoId prop.');
    return null;
  }

  const embedUrl = `https://player.vimeo.com/video/${videoId}`;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={showModal}
        className={`w-full border-none h-full bg-transparent p-0 rounded-lg`}
        style={{boxShadow: 'none'}}
      >
        <Card
          hoverable
          className={`w-full h-full border-none rounded-lg`}
          cover={
            <img
              alt="example"
              src="https://cdn.shopify.com/s/files/1/0585/9386/9871/files/8551161da24a3ea494995a8a89f6dbda.jpg?v=1738089857"
              className={`w-full h-full object-cover rounded-lg`}
              style={{borderRadius: '0.5rem'}}
            />
          }
        >
          <Meta
            avatar={<Avatar src={playButtonIcon} className={`p-0`} />}
            className={`absolute bottom-4 right-0 p-0`}
          />
        </Card>
      </Button>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        maskClosable={true}
        style={{
          top: '50%',
          transform: 'translateY(-15%)',
        }}
        className={`w-full h-full p-0 m-0`}
      >
        <div
          className={className}
          style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            overflow: 'hidden',
          }}
        >
          <iframe
            src={embedUrl}
            width={width}
            height={height}
            title={title}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          ></iframe>
        </div>
      </Modal>
    </>
  );
}
