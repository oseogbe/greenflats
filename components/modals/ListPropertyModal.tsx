"use client";

import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import LocationSelect from "../inputs/LocationSelect";
import useListPropertyModal from "@/hooks/useListPropertyModal";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const ListPropertyModal = () => {
    const router = useRouter();
    const listPropertyModal = useListPropertyModal();

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            state: null,
            lga: null,
            area: null,
            adultCount: 1,
            childrenCount: 0,
            infantCount: 0,
            petCount: 0,
            roomCount: 1,
            bathroomCount: 1,
            images: [],
            price: 1,
            title: '',
            description: '',
        }
    });

    const category = watch('category');
    const state = watch('state');
    const lga = watch('lga');
    const area = watch('area');
    const adultCount = watch('adultCount');
    const childrenCount = watch('childrenCount');
    const infantCount = watch('infantCount');
    const petCount = watch('petCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const images = watch('images');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [state]);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    }

    const onBack = () => setStep((value) => value - 1);

    const onNext = () => setStep((value) => value + 1);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }
        setIsLoading(true);

        const imagePromises = images.map((image: File) => {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "yq7kaqus");
            return axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, formData)
                .then(res => res.data.secure_url);
        });

        Promise.all(imagePromises).then(result => {
            console.log("result", result);
            setCustomValue('images', result);
            // axios.post('/api/listings', data)
            //     .then(() => {
            //         toast.success("Property listing created!");
            //         router.refresh();
            //         reset();
            //         setStep(STEPS.CATEGORY);
            //         listPropertyModal.onClose();
            //     }).catch(() => {
            //         toast.error("An error occurred.");
            //     }).finally(() => {
            //         setIsLoading(false);
            //     });
        }).catch(error => {
            console.error("Error uploading images:", error);
        })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) return "Create";
        return "Next";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) return undefined;
        return "Back";
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describes your property?"
                subtitle="Pick a category"
            />
            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    max-h-[50vh]
                    overflow-y-auto
                    scrollbar-hide
                "
            >
                {
                    categories
                        .filter(item => item.label !== "Trending")
                        .map((item) => (
                            <div key={item.label} className="col-span-1">
                                <CategoryInput
                                    onClick={(category) => setCustomValue('category', category)}
                                    selected={category === item.label}
                                    label={item.label}
                                    description={item.description}
                                // icon={item.icon}
                                />
                            </div>
                        ))
                }
            </div>
        </div>
    );

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your property located?"
                    subtitle="Help guests find you!"
                />
                <LocationSelect
                    state={state}
                    lga={lga}
                    area={area}
                    onStateChange={(value) => setCustomValue('state', value)}
                    onLGAChange={(value) => setCustomValue('lga', value)}
                    onAreaChange={(value) => setCustomValue('area', value)}
                />
                {state ? (
                    <Map center={[state.latitude, state.longitude]} />
                ) : (
                    <Map center={[9.079851, 7.47087]} />
                )}
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your place"
                    subtitle="What amenities do you have?"
                />
                <Counter
                    title="Adults"
                    subtitle="How many adults are allowed?"
                    value={adultCount}
                    onChange={(value) => setCustomValue('adultCount', value)}
                />
                <Counter
                    title="Children"
                    subtitle="How many kids are allowed?"
                    value={childrenCount}
                    onChange={(value) => setCustomValue('childrenCount', value)}
                />
                <Counter
                    title="Infants"
                    subtitle="How many infants are allowed?"
                    value={infantCount}
                    onChange={(value) => setCustomValue('infantCount', value)}
                />
                <Counter
                    title="Pets"
                    subtitle="How many pets are allowed?"
                    value={petCount}
                    onChange={(value) => setCustomValue('petCount', value)}
                />
                <hr />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add some photos of your place"
                    subtitle="Show guests what your place looks like!"
                />
                <ImageUpload
                    images={images}
                    onChange={(images) => setCustomValue('images', images)}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place?"
                    subtitle="Concise description works best!"
                />
                <Input
                    id="title"
                    label="Title"
                    type="text"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id="description"
                    label="Description"
                    type="textarea"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Now, set your price"
                    subtitle="How much do you charge per night?"
                />
                <Input
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <Modal
            isOpen={listPropertyModal.isOpen}
            onClose={listPropertyModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="List your property!"
            body={bodyContent}
        />
    )
}

export default ListPropertyModal
