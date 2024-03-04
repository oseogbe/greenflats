"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai"
import useOnClickOutside from "use-onclickoutside";

import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import useListPropertyModal from "@/hooks/useListPropertyModal";

import Avatar from "../Avatar"
import MenuItem from "./MenuItem";

import { SafeUser } from "@/types";

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const listPropertyModal = useListPropertyModal();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const toggleOpen = useCallback(() => {
        setIsOpen(value => !value);
    }, []);

    useOnClickOutside(ref, toggleOpen);

    const onListProperty = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        listPropertyModal.onOpen();
    }, [currentUser, loginModal, listPropertyModal]);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onListProperty}
                    className="
                        hidden 
                        md:block 
                        text-sm 
                        font-semibold 
                        py-3 
                        px-4 
                        rounded-full 
                        hover:bg-neutral-100 
                        transition 
                        cursor-pointer
                    "
                >
                    List a property
                </div>
                <div
                    onClick={toggleOpen}
                    className="
                        p-4 
                        md:py-1 
                        md:px-2 
                        border-[1px] 
                        border-neutral-200 
                        flex 
                        flex-row 
                        items-center 
                        gap-3 
                        rounded-full 
                        cursor-pointer 
                        hover:shadow-md 
                        transition
                    "
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>

            {isOpen &&
                <div
                    ref={ref}
                    className="
                        absolute 
                        rounded-xl 
                        shadow-md 
                        w-[40vw] 
                        md:w-3/4 
                        bg-white 
                        overflow-hidden 
                        right-0 
                        top-12 
                        text-sm
                    "
                >
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem
                                    label="Trips"
                                    onClick={() => router.push('/trips')}
                                    className="font-semibold"
                                />
                                <MenuItem
                                    label="Reservations"
                                    onClick={() => { }}
                                    className="font-semibold"
                                />
                                <MenuItem
                                    label="Wishlist"
                                    onClick={() => { }}
                                    className="font-semibold"
                                />
                                <MenuItem
                                    label="My properties"
                                    onClick={() => { }}
                                    className="font-semibold"
                                />
                                <MenuItem
                                    label="List a property"
                                    onClick={onListProperty}
                                    className="font-semibold"
                                />
                                <hr />
                                <MenuItem
                                    label="Account"
                                    onClick={() => { }}
                                />
                                <MenuItem
                                    label="Help Center"
                                    onClick={() => { }}
                                />
                                <hr />
                                <MenuItem
                                    label="Logout"
                                    onClick={() => signOut()}
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    label="Login"
                                    onClick={loginModal.onOpen}
                                />
                                <MenuItem
                                    label="Sign up"
                                    onClick={registerModal.onOpen}
                                />
                            </>
                        )}

                    </div>
                </div>
            }
        </div>
    )
}

export default UserMenu