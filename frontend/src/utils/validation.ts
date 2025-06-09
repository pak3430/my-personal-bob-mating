// frontend/src/utils/validation.ts
// 클라이언트 측 유효성 검사 함수
export const isValidEmail = (email: string): boolean => {
  // 간단한 이메일 정규식
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPassword = (password: string): boolean => {
  // 최소 8자, 하나의 대문자, 하나의 소문자, 하나의 숫자, 하나의 특수문자
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
    password
  );
};

export const isValidPhoneNumber = (phone: string): boolean => {
  // 대한민국 전화번호 형식 (010-XXXX-XXXX 또는 010XXXXXXXX)
  return /^010-?([0-9]{4})-?([0-9]{4})$/.test(phone);
};
