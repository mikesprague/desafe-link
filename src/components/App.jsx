import { emojiBlast } from 'emoji-blast';
import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaCircleXmark, FaGithub, FaLink } from 'react-icons/fa6';

import './App.css';

const defaultMessage = 'Enter a valid Microsoft Safe Link above';

const emojiCountAtom = atomWithStorage(1);
const decodedUrlAtom = atom(defaultMessage);
const hasUrlAtom = atom(false);

export default function App() {
  const { register, resetField, setFocus, watch } = useForm();
  const [emojiCount, setEmojiCount] = useAtom(emojiCountAtom);

  const safeLink = watch('safe-link');
  // https://nam12.safelinks.protection.outlook.com/?url=https%3A%2F%2Fstore.apple.com%2Fus%2Fxc%2Fhome&data=05%7C01%7Credacted%40redacted.email%7Cfa8be8e34881447e130408db97167730%7C5d7e43661b9b45cf8e79b14b27df46e1%7C0%7C0%7C638269894974647458%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=1r35qXl57%2FPUyyWK7yJSSsOVoo4E3Vs2btacsYp6uLc%3D&reserved=0

  const [decodedUrl, setDecodedUrl] = useAtom(decodedUrlAtom);
  const [hasUrl, setHasUrl] = useAtom(hasUrlAtom);

  const { onChange, onBlur, name, ref } = register('safe-link', {
    required: true,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: creates almost infinite loop, not listed intentionally
  useEffect(() => {
    if (safeLink) {
      let url;

      try {
        url = new URL(safeLink);
      } catch (error) {
        console.log(error);
        return;
      }

      let params;

      try {
        params = new URLSearchParams(url.search);
        const targetUrl = params.get('url');

        if (targetUrl) {
          setEmojiCount(emojiCount + 1);
          setDecodedUrl(decodeURIComponent(targetUrl));
          setHasUrl(true);
          emojiBlast({
            emojiCount,
            position: {
              x: 200,
              y: 100,
            },
          });
        } else {
          setDecodedUrl("ERROR: Couldn't find target URL");
        }
      } catch (error) {
        console.log(error);
        setDecodedUrl("ERROR: Couldn't decode URL");
      }
    } else {
      setDecodedUrl(defaultMessage);
    }

    setFocus('safe-link');

    return () => {
      setDecodedUrl(defaultMessage);
      setHasUrl(false);
    };
  }, [safeLink, setFocus]);

  const clearForm = () => {
    setDecodedUrl(defaultMessage);
    setHasUrl(false);
    resetField('safe-link');
  };

  return (
    <>
      <div className="main-container min-h-screen bg-base-200 w-full">
        <div className="main-container-content text-center w-full">
          <div className="w-full mt-8">
            <h1 className="text-5xl font-bold">
              desafe.link &nbsp;
              <FaLink className="inline" />
            </h1>
            <h2 className="my-2 text-2xl font-semibold leading-tight text-center">
              <small className="text-lg font-bold text-center">
                Microsoft Safe Link Unfurler
              </small>
            </h2>
            <div className="mt-8">
              <div className="form-control items-center">
                <textarea
                  id="safe-link"
                  className=" textarea textarea-md textarea-bordered break-all w-full"
                  placeholder="Enter a valid Microsoft Safe Link"
                  style={{ minHeight: '8rem', maxHeight: '50%' }}
                  name={name}
                  ref={ref}
                  onChange={onChange}
                  onBlur={onBlur}
                />
                {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                <label className="label">
                  <span className="decoded-url label-text text-lg break-all">
                    {hasUrl && decodedUrl ? (
                      <>
                        <a
                          href={decodedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="decoded-safe-link text-accent"
                        >
                          {decodedUrl}
                        </a>
                        <button
                          type="button"
                          onClick={() => clearForm()}
                          className="ml-5 text-sm text-red-600 cursor-pointer"
                          title="Clear form"
                        >
                          <FaCircleXmark />
                        </button>
                      </>
                    ) : (
                      `${decodedUrl}`
                    )}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed min-w-full text-base text-center bottom-2">
        <a
          href="https://github.com/mikesprague/desafe-link"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaGithub className="inline" size="2rem" />
        </a>
      </div>
    </>
  );
}
