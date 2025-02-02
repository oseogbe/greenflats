"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";

import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";

interface ImageUploadProps {
    onChange: (value: File[]) => void;
    images: File[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    images
}) => {
    const handleUploadImages = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newImages = e.target.files;
        if (!newImages) return;
        const newImagesArray = Array.from(newImages);
        onChange([...images, ...newImagesArray]);
    }, [images, onChange]);

    const handleDragImage = useCallback((result: DropResult) => {
        if (!result.destination) return;
        const items = Array.from(images);
        const [recordedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, recordedItem);
        onChange(items);
    }, [images, onChange]);

    const handleRemoveImage = useCallback((index: number) => {
        onChange(images.filter((_, i) => i !== index));
    }, [images, onChange]);

    return (
        <>
            <DragDropContext onDragEnd={handleDragImage}>
                <Droppable droppableId="images" direction="horizontal">
                    {(provided) => (
                        <div
                            className="h-full max-h-[50vh] w-full overflow-y-auto"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {
                                images.length < 1 && (
                                    <>
                                        <input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleUploadImages}
                                            multiple
                                            className="hidden"
                                        />
                                        <label htmlFor="image">
                                            <div className="
                                                cursor-pointer
                                                hover:opacity-70
                                                transition
                                                border-dashed
                                                border-2
                                                p-20
                                                border-neutral-300
                                                flex
                                                flex-col
                                                justify-center
                                                items-center
                                                gap-4
                                                text-neutral-600
                                            ">
                                                <IoIosImages size={50} />
                                                <p className="font-semibold text-lg">Click to upload</p>
                                            </div>
                                        </label>
                                    </>
                                )
                            }
                            {
                                images.length >= 1 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {images.map((image, index) => {
                                            return (
                                                <Draggable key={index} draggableId={index.toString()} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            className="relative w-full aspect-square"
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <Image
                                                                src={URL.createObjectURL(image)}
                                                                alt="a property listed on greenflats"
                                                                fill
                                                                className="object-cover"
                                                            />
                                                            <button type="button" className="absolute top-3 right-3 p-2 rounded-full bg-white" onClick={() => handleRemoveImage(index)}>
                                                                <BiTrash size={16} className="text-red-500" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                        })}
                                        <input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleUploadImages}
                                            multiple
                                            className="hidden"
                                        />
                                        <label htmlFor="image">
                                            <div className="
                                                cursor-pointer
                                                hover:opacity-70
                                                transition
                                                border-dashed
                                                border-2
                                                h-full
                                                py-[72px]
                                                border-neutral-300
                                                flex
                                                flex-col
                                                justify-center
                                                items-center
                                                gap-4
                                                text-neutral-600
                                            ">
                                                <IoIosImages size={36} />
                                                <p className="font-semibold">Click to Upload More</p>
                                            </div>
                                        </label>
                                    </div>
                                )
                            }
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
}

export default ImageUpload
