import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { userSignup } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';


interface TempData {
    username: string;
    email: string;
    password: string;
    otp?:string
    role?: string;
}


function Otp({ userData }: { userData: TempData }) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    console.log(userData,'userData from otp')
    const [otp1, setOtp1] = useState<string>("");
    const [otp2, setOtp2] = useState<string>("");
    const [otp3, setOtp3] = useState<string>("");
    const [otp4, setOtp4] = useState<string>("");
    const [countdown, setCountdown] = useState<number>(60)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [focusedInput, setFocusedInput] = useState<number>(0);
    const [showResend, setShowResend] = useState<boolean>(true);

    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            if (countdown > 0) {
                setCountdown((prev) => prev - 1)
            } else {
                setShowResend(false);
            }
        }, 1000);
        return () => {
            clearInterval(timer)
        }
    }, [countdown]);

    useEffect(() => {
        inputRefs[0].current?.focus();
    }, [])

    const handleOtpChange = (index: number, value: string) => {
        switch (index) {
            case 1:
                setOtp1(value);
                break;
            case 2:
                setOtp2(value);
                break;
            case 3:
                setOtp3(value);
                break;
            case 4:
                setOtp4(value);
                break;
            default:
                break;
        }
        if (value.length === 1 && index <= inputRefs.length - 1) {
            inputRefs[index].current?.focus();
        }
    };



    const handleBackSpace = async (index: number, e: KeyboardEvent<HTMLInputElement>) => {

        if (e.key === 'Backspace') {
            // If the current input has no value and is not the first input, move focus to the previous input
            switch (index) {
                case 1:
                    setOtp1("");
                    break;
                case 2:
                    setOtp2("");
                    break;
                case 3:
                    setOtp3("");
                    break;
                case 4:
                    setOtp4("");
                    break;
                default:
                    break;
            }
            if (index > 0) {
                inputRefs[index - 2].current?.focus();
            }
        }
    }

    const handleToResendOtp = async () => {
        setCountdown(60);
        setShowResend(true);
        dispatch(userSignup(userData))
        console.log("called the resend button");
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const joinedOtp = "" + otp1 + otp2 + otp3 + otp4
        console.log(joinedOtp,'----------')
        userData.otp = joinedOtp
        await dispatch(userSignup(userData))
        navigate("/");
    }

    return (
        <>
            <form className='mt-8' onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-16">
                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                        {[otp1, otp2, otp3, otp4].map((otp, index) => (
                            <div key={index} className="w-16 h-16">
                                <input
                                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                    minLength={1}
                                    required
                                    ref={inputRefs[index]}
                                    maxLength={1}
                                    type="text"
                                    name={`otp-${index + 1}`}
                                    id={`otp-${index + 1}`}
                                    value={otp}
                                    onFocus={() => setFocusedInput(index)}
                                    onChange={(e) =>
                                        handleOtpChange(index + 1, e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        handleBackSpace(index + 1, e)
                                    }
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col space-y-5">
                        <div>
                            <button  className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-red-700 hover:bg-red-950 border-none text-white text-sm shadow-sm" >
                                Verify Account
                            </button>
                        </div>
                        <div className='text-white text-center'>
                            {showResend && (
                                <span>{` OTP Valid For :  (${countdown}sec )`}</span>
                            )}
                        </div>
                        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                            <p>Didn't receive code?</p>{""}
                            <a
                                className={`flex flex-row items-center ${!showResend ? "text-blue-600" : "text-gray-400"
                                    }`}
                                rel="noopener noreferrer"
                            >

                                <button
                                    type='button'
                                    onClick={handleToResendOtp}
                                    disabled={!showResend}
                                >
                                    Resend
                                </button>

                            </a>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Otp