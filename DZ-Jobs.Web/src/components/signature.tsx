import { Box } from "@mui/material";
import throttle from "lodash-es/throttle";
import {
  CanvasHTMLAttributes,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import SignaturePad from "signature_pad";
import { useResizeObserver } from "./useResizeObserver";

export interface SignatureHandle {
  getSignature: () => Promise<File | undefined>;
  clear: () => void;
}

interface Props {
  canvasProps?: CanvasHTMLAttributes<HTMLCanvasElement>;
}

export const Signature = forwardRef<SignatureHandle, Props>(
  ({ canvasProps }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasDim, setCanvasDim] = useState<{ width?: number; height: number }>({
      height: 160,
      width: 400,
    });
    
    // Updated useRef initialization
    const signaturePadRef = useRef<SignaturePad | null>(null);

    useImperativeHandle(ref, () => ({
      getSignature: async () => {
        const dataUrl = signaturePadRef.current?.toDataURL("image/png");
        if (!dataUrl) {
          return;
        }
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        return new File([blob], "signature.png", { type: blob.type });
      },
      clear: () => {
        signaturePadRef.current?.clear();
      },
    }));

    const onCanvasResize = useCallback(
      ({ width, height }: { width: number; height: number }) => {
        throttle(() => {
          setCanvasDim({ width, height });
        }, 50)();
      },
      []
    );

    useLayoutEffect(() => {
      const canvas = canvasRef.current;

      if (canvas) {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d")?.scale(ratio, ratio);
        signaturePadRef.current?.clear();
      }
    }, [canvasDim]);

    useResizeObserver(canvasRef.current, onCanvasResize);

    useLayoutEffect(() => {
      if (canvasRef.current) {
        // Correct way to initialize SignaturePad
        signaturePadRef.current = new SignaturePad(canvasRef.current, {
          penColor: "blue",
          backgroundColor: "white",
        });
      }

      return () => {
        signaturePadRef.current?.off();
      };
    }, []);

    return (
      <Box>
        <Box
          component="canvas"
          ref={canvasRef}
          width={canvasDim.width}
          height={canvasDim.height}
          sx={{ minWidth: "100%" }}
          {...canvasProps}
        />
      </Box>
    );
  }
);
