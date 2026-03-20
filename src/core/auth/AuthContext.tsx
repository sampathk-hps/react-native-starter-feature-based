import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { TokenService } from '../api/tokenService';
import { logger } from '../logger/Logger';

interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface AuthData {
  isAuthenticated: boolean;
  user: AuthUser | null;
  accessToken: string | null;
}

interface AuthContextType {
  authData: AuthData;
  loading: boolean;
  login: (
    tokens: { accessToken: string; refreshToken: string },
    user: AuthUser,
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const defaultAuthData: AuthData = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
};

const AuthContext = createContext<AuthContextType>({
  authData: defaultAuthData,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<AuthData>(defaultAuthData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const tokens = await TokenService.get();
        if (tokens?.accessToken) {
          setAuthData({
            isAuthenticated: true,
            user: null,
            accessToken: tokens.accessToken,
          });
        }
      } catch (error) {
        logger.error('[AuthContext] Failed to restore session', error);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = useCallback(
    async (
      tokens: { accessToken: string; refreshToken: string },
      user: AuthUser,
    ) => {
      await TokenService.save(tokens);
      setAuthData({
        isAuthenticated: true,
        user,
        accessToken: tokens.accessToken,
      });
    },
    [],
  );

  const logout = useCallback(async () => {
    await TokenService.clear();
    setAuthData(defaultAuthData);
  }, []);

  return (
    <AuthContext.Provider value={{ authData, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
