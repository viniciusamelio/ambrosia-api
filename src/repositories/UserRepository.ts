import { createConnection, getConnectionManager } from "typeorm";

import { User } from "../entity/User";
import { Address } from "../entity/Address";

class UserRepository {
    async save(user: User): Promise<User> {
        try {
            return createConnection().then(async connection => {
                const userRepository = connection.getRepository(User);
                await userRepository.save(user);
                const savedUser = await userRepository.findOne({ id: user.id });
                connection.close();
                return savedUser;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async delete(user: User): Promise<void> {
        try {
            return createConnection().then(async connection => {
                const userRepository = connection.getRepository(User);
                await userRepository.delete(user);
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            })
        } catch (error) {
            return error;
        }
    }

    async storeAddress(user: User, address: Address): Promise<User> {
        try {
            return createConnection().then(async connection => {
                address.user = user;
                const addressRepository = connection.getRepository(Address);
                await addressRepository.save(address);

                const addressList = await addressRepository.find({ user: { id: user.id } });

                user.addresses = addressList;

                user.addresses.push(address);

                const userRepository = connection.getRepository(User);
                await userRepository.save(user);
                const savedUser = await userRepository.find({ relations: ["addresses"], where: { id: user.id } });

                connection.close();
                return savedUser;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async updateAddress(userId: String, address: Address): Promise<User> {
        try {
            return createConnection().then(async connection => {
                const addressRepository = connection.getRepository(Address);
                await addressRepository.save(address);
                const userRepository = connection.getRepository(User);
                const user = await userRepository.findOne({ relations: ["addresses"], where: { id: userId } });
                connection.close();
                return user;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async deleteAddress(addressId: string): Promise<User> {
        try {
            return createConnection().then(async connection => {
                const addressRepository = connection.getRepository(Address);
                await addressRepository.delete({ id: addressId });
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            })
        } catch (error) {
            return error;
        }
    }

    async findByEmail(user: User): Promise<User> {
        try {
            return createConnection().then(async connection => {
                const userRepository = connection.getRepository(User);
                const foundUser = await userRepository.findOne({ email: user.email });
                connection.close();
                return foundUser;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }
}

export { UserRepository };