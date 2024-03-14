"use client";

import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface ImageGalleryProps {
    isOpen: boolean;
    onClose: () => void;
    slides: SlideImage[]
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
    isOpen,
    onClose,
    slides
}) => {
    return (
        <Lightbox
            open={isOpen}
            close={onClose}
            slides={slides}
            plugins={[Fullscreen, Slideshow, Counter, Thumbnails]}
            thumbnails={{
                position: "start"
            }}
        />
    )
}

export default ImageGallery