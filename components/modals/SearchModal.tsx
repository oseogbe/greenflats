"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import qs from "query-string";
import { formatISO } from "date-fns";

import Modal from "./Modal";
import Heading from "../Heading";
import LocationSelect, { StateSelectValue } from "../inputs/LocationSelect";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

import useSearchModal from "@/hooks/useSearchModal";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [step, setStep] = useState(STEPS.LOCATION);
    const [state, setState] = useState<StateSelectValue>();
    const [adultCount, setAdultCount] = useState(1);
    const [childrenCount, setChildrenCount] = useState(0);
    const [infantCount, setInfantCount] = useState(0);
    const [petCount, setPetCount] = useState(0);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    });

    const onBack = useCallback(() => {
        setStep(value => value - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep(value => value + 1);
    }, []);

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            adultCount,
            childrenCount,
            infantCount,
            petCount,
            state: state?.value,
        }

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        setStep(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);
    }, [step, params, adultCount, childrenCount, infantCount, petCount, state?.value, dateRange.startDate, dateRange.endDate, onNext, searchModal, router]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return "Search";
        }
        return "Next";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined;
        }
        return "Back";
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Where"
                subtitle="Choose the location you are interested in?"
            />
            <LocationSelect
                state={state}
                onStateChange={(value) => setState(value as StateSelectValue)}
            />
        </div>
    )

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="When"
                    subtitle="Pick your check-in and check-out dates"
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Who"
                    subtitle="Enter the guests information"
                />
                <Counter
                    title="Adults"
                    subtitle="Ages 13 or above"
                    value={adultCount}
                    onChange={(value) => setAdultCount(value)}
                />
                <Counter
                    title="Children"
                    subtitle="Ages 2 to 12"
                    value={childrenCount}
                    minValue={0}
                    onChange={(value) => setChildrenCount(value)}
                />
                <Counter
                    title="Infants"
                    subtitle="Under 2"
                    value={infantCount}
                    minValue={0}
                    onChange={(value) => setInfantCount(value)}
                />
                <Counter
                    title="Pets"
                    subtitle="Bringing a service animal?"
                    value={petCount}
                    minValue={0}
                    onChange={(value) => setPetCount(value)}
                />
            </div>
        )
    }

    return (

        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            body={bodyContent}
        />
    )
}

export default SearchModal